from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
# from database import Base, engine 
# from models import PreferencesCategory, Preferences 

import models, schemas
from database import get_db

# -----------------------
# Création de l'application FastAPI
# -----------------------
app = FastAPI(title="Preferences Management Service")

# Middleware CORS pour autoriser le frontend (React, Vue, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Router avec préfixe /api
# -----------------------
router = APIRouter(prefix="/api")

# -----------------------
# Routes pour PreferencesCategory
# -----------------------

@router.post("/categories/", response_model=schemas.PreferencesCategory)
def create_category(category: schemas.PreferencesCategoryCreate, db: Session = Depends(get_db)):
    db_category = db.query(models.PreferencesCategory).filter(models.PreferencesCategory.name == category.name).first()
    if db_category:
        raise HTTPException(status_code=400, detail="Category already exists")
    new_category = models.PreferencesCategory(name=category.name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

@router.get("/categories/", response_model=List[schemas.PreferencesCategory])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.PreferencesCategory).all()

@router.put("/categories/{category_id}", response_model=schemas.PreferencesCategory)
def update_category(category_id: int, category: schemas.PreferencesCategoryCreate, db: Session = Depends(get_db)):
    db_category = db.get(models.PreferencesCategory, category_id)  # SQLAlchemy 2.x
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    db_category.name = category.name
    db.commit()
    db.refresh(db_category)
    return db_category

@router.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = db.get(models.PreferencesCategory, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_category)
    db.commit()
    return {"detail": "Category deleted"}


# -----------------------
# Routes pour Preferences
# -----------------------

@router.post("/preferences/", response_model=schemas.Preferences)
def create_preference(preference: schemas.PreferencesCreate, db: Session = Depends(get_db)):
    category = db.get(models.PreferencesCategory, preference.category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    new_pref = models.Preferences(
        user_id=preference.user_id,
        category_id=preference.category_id,
        value=preference.value
    )
    db.add(new_pref)
    db.commit()
    db.refresh(new_pref)
    return new_pref

@router.get("/preferences/", response_model=List[schemas.Preferences])
def list_preferences(db: Session = Depends(get_db)):
    return db.query(models.Preferences).all()

@router.get("/preferences/user/{user_id}", response_model=List[schemas.Preferences])
def list_user_preferences(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Preferences).filter(models.Preferences.user_id == user_id).all()

@router.put("/preferences/{preference_id}", response_model=schemas.Preferences)
def update_preference(preference_id: int, preference: schemas.PreferencesCreate, db: Session = Depends(get_db)):
    db_pref = db.get(models.Preferences, preference_id)
    if not db_pref:
        raise HTTPException(status_code=404, detail="Preference not found")
    category = db.get(models.PreferencesCategory, preference.category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    db_pref.user_id = preference.user_id
    db_pref.category_id = preference.category_id
    db_pref.value = preference.value
    db.commit()
    db.refresh(db_pref)
    return db_pref

@router.delete("/preferences/{preference_id}")
def delete_preference(preference_id: int, db: Session = Depends(get_db)):
    db_pref = db.get(models.Preferences, preference_id)
    if not db_pref:
        raise HTTPException(status_code=404, detail="Preference not found")
    db.delete(db_pref)
    db.commit()
    return {"detail": "Preference deleted"}


# -----------------------
# Point d’entrée
# -----------------------
app.include_router(router)

@app.get("/")
def root():
    return {"message": "Bienvenue dans le Preferences Management Service API"}

if __name__ == "__main__":
    from database import Base, engine
    import models

    # Crée les tables si elles n’existent pas
    Base.metadata.create_all(bind=engine)

    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
