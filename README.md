
# Social chat app frontend

<br>

## Documentation
* [Introduction](#introduction)
    - [About the chat app](#1-about-the-chat-app)
    - [Features](#2-features)
* [Installation Guild](#installation-guide)
    - [Without docker file](#without-the-docker-file)
    - [With the docker file](#with-the-docker-file)
    - [With the docker compose file](#with-the-docker-compose-file)

## Introduction:
1. About the app
- A chat app application built by our team aimed to a small group of people such as 
  students in class, people in a building, or with your group of friends, ....

2. Features 
- Our app has some of the features below:
  + Register, Login, Logout.
  + View your profile.
  + View other's profiles.
  + Update password, user name, email.
  + Show online users.
  + Show list of friends.
  + Show list of conversations: Private Chat(1v1) or Group Chat.
  + Send emoji, image, text in chat box for both Private Chat & Group Chat.
  + Video call for private chat and group chat. 
  + Video call screen sharing for private chat & group chat.


## Installation Guide

### Prerequisite

If you running this with out the docker file, your <b>node version</b> must be <b>16.13.2</b>.<br>

Try [Node version manager](https://github.com/nvm-sh/nvm) for quickly changing node version

### Without the docker file

#### 1. Change directory

```
  $  cd chat-app-frontend
```

#### 2. Install required packages

```
  $  yarn install
```

#### 3. Run project

```
  $  yarn start
```
    
### With the docker file

```
  $  docker build -t chat-app-frontend:lastest .
    
  $  docker run -it --rm chat-app-frontend -p 3000:3000
```
    

### With the docker compose file

The instruction for running this frontend with docker-compose file is in the backend repo.<br>
You can find the backend repository in [here](https://github.com/namxle-hust/chat-app-backend).

Wait for your browser to open or go to your browser and open ``localhost:3000``
