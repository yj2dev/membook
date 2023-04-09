from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import index
from dotenv import load_dotenv
import uvicorn
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
def create_app():
    app = FastAPI()
    origins = []
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(index.router)
    return app

app = create_app()


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000)