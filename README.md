# altschool-Blog

# blog_api
This is an api for a blog

# REQUIREMENTS
1. User should be able to signup
2. User should be able to login with Passport using JWT
3. User(s) should be able to get articles
4. User should be able to create articles
5. User should be able to update and delete articles
6. Test application
# SETUP

install dependecies:
bcrypt
dotenv
express
jest
jsonwebtoken
mongoose
passport
passport-jwt
passport-local
passport-local-mongoose
supertest

run // npm install -i //  


# BASE URL 

https://vast-sarong-dove.cyclic.app

# MODELS

## user

## field	## data_type	## constraints

email	     string	         required, unique
firstname    string	         required
lastname     string	         required
password	 string	         required
article      objectId        ref

## article

## field	## data_type	## constraints
title          string    	  required
desc           string
author         string         required
read_count     number         default: 0
state	       String        draft: default, published
readingTime    number
tags           [String]

# APIs

## signUp User

Route: /signup
Method: POST
Body:

```   {
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe"
}   

 ```

## Responses

sucessss

```  {
    
    {
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",

}

}    

```

# LOgin User

Route: /login
Method: POST
Body:

```  {
  "password": "Password1",
  "email": 'doe@example.com"
   }  

```

## Responses

Sucesss

``` { 
    token: "awrestdtsrefctxcxtgxycyfxtxgcgfxxcffxfccgfxcgcycggcfcyh"  
    }  
 ```

# Create articles

Route: /orders
Method: POST
Header
Authorization: Bearer {token}
Body:




`````  
 
 {
"title" : "johnbull is my son"
 }     
  
  `````





## Responses

Success

``` `   

 "status": "successful",
    "data": {
        "ArticleModel": {
            "title": "bola is a crime scene",
            "author": "636815b50a9b4f4af56084ba",
            "state": "draft",
            "read_Count": 0,
            "tags": [],
            "_id": "636825b494ad88d3e9180d07"
        }
    }
}        

````

# get aerticle

Route: /article/:id
Method: GET
Header
Authorization: Bearer {token}


## Responses
   
   Success


`````       {
        "_id": "636825b494ad88d3e9180d07",
        "title": "bola is a crime scene",
        "author": "636815b50a9b4f4af56084ba",
        "state": "published",
        "read_Count": 0,
        "tags": []
    }                       
    
 `````



 # update state


Route: /article
Method: patch
Header:
Authorization: Bearer {token}



````       {"state": "published"}    ````


## Response 

successs

````        { 
    _id:  6367fa8439e2f153dde904d8
title" : "life is going very great"
author: 6367eb4330132f40beef946c
state: "published"
read_Count: 0
}              
 ````


# delete article 

Route: /article
Method: delete
Header:
Authorization: Bearer {token}
Query params: {(_id: id)}

## Response

sucesss

```` {
    "status" : "successful"
}  ````




# contributor

## Ayibatonye Ikemike