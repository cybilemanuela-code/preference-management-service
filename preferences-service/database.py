from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker


# Remplace USER, PASSWORD et DB_NAME par tes infos MySQL
DATABASE_URL = "mysql+pymysql://root@localhost:3306/activity_planner" # ou PostgreSQL/MySQL selon ton besoin 
engine = create_engine(DATABASE_URL) 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Fonction pour récupérer une session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()