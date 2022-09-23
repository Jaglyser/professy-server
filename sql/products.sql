CREATE TABLE products (
    id uuid NOT NULL PRIMARY KEY,
    brand varchar(255), 
    category varchar(255), 
    "subCatergory" varchar(255), 
    "modelName" varchar(255),
    "shortDescription" varchar(255),
    "longDescription" varchar(255),
    "color" varchar(255),
    "size" varchar(255),
    "pictureFile" varchar(255),
    "netPrice" varchar(255)
);