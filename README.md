# My-Blog

## What I learned

Build a fullstack blog app using mongoDB, Express, HTML/CSS/Javascript, and Nodejs. 

![1678002493515](../Blog/README.assets/1678002493515.png)

On the Home page we could click all the articles that I posts from database. When click the title, the whole information could show up. I could edit the posts when the author themselves click the edit button.

Also I have the Login and Register functionality. I used implement authentication with tokens.

Design with:

- HTML/CSS
- Javascript
- Mongoose
- Nodejs
- Express
- jwt/Authentication/cookies



## Learned React Router

We assign a top level component for each route or page, that component is dynamically injected into the browser then we visit that route.

Using React Router make less request to the server. The whole website feels faster and slicker~细腻~.

We generally typing the URL in the address bar and hit enter, that send the request to a server, and the server handles it.The server will send back a full html page, which we will view in a browser. If a user will click a link to another page, like the **About** page, it sends a new request to the server,then the server will response by sending a new about page.That process will continue over and over again.

React applications don't work like that. They delegate all the routing and changing of page content to the browser, just like we make initial request to the browser, the server will responds to that by sending the html page, but it also sends back the compiled react javascript files,which controls the react application.

React and React Router can take full control of the applicaiton. Initially the html of the page that we get back is empty, and then react injects the content dynamically using the components that we create. If we click to a link to a new page, the react is going to step in and intercept~拦截~ the request to stop it from going to the server,instead it is going to look at new page request and inject required content on the screen. For example clicking on a **About** link, the react router will tell react to inject the **About** component into browser, if we click a **Contact** link, it would tell react to inject the **Contact** component.



## React Link

React render all of the anchor tags in the browser, they still try to send a request to the server for a new page, but the **Link to** is a special functionality, that is for react router to prevent that request to the server, it just look at the url or the path where we are going to. It will matches one of the route path, it can injects  the content that we need. We do not need the server to resend back the html page. It will be much quicker than sending a fresh request to the server.



## JsonWebToken

If a member needs to log in, the user needs to enter the user name and password, and send it to the server, and the server verifies the user name and password. A Token will be generated and sent to the user. When the user sends a request, the token will be added to the http header. Generally speaking, The user does not need to enter the user name and password when the token has passed the verification and has not expired.  The server recognizes the token in the header and returns a specific page.~假如有一个会员需要登录，用户需要输入用户名和密码，并且发送给服务器，服务器验证发过来的用户名和密码。会生成一个Token发送给用户，用户发送请求的时候会在http的头部加上token，一般来说token验证通过，没有过期，用户不需要再输入用户名和密码。服务器识别到头部的token就返回非用户专属的页面。~



## Cookie

The browser initiates an http request, and the server performs set-cookie settings. There are two attributes in the cookie, Name and value. The server will fill these two values completely. After the cookie is sent to the browser, it will be automatically saved, so that the browser will send it in the future. A cookie is attached to every request. It can be understood that a cookie is just data stored in the browser.~浏览器发起http请求，服务器进行set-cookie设置，cookie里有Name和value两个属性，服务器会把这两个值填充完整，通过cookie发给浏览器之后会自动保存下来，这样以后浏览器发送的每一个请求都会附上cookie。可以理解成cookie就是存储在浏览器的数据而已。~



## Session

Use the username and password to log in, and the server checks that the authentication of the username and password. So a sessionID (many irregular string combinations) and session end time were created on the server side.

The server sends these two to the browser with a cookie, and adds the sessionID to the cookie. The session end time is the expiration date of the cookie. The browser saves the cookie after getting it, and every request sent by the browser will attach the cookie,also automatically send the session ID to the server for the next visit, and the browser will automatically delete the cookie until the expiration date of the cookie is over.~使用用户名和密码进行登录，服务器核对用户名密码身份验证成功。于是就在服务器这边创立了一个sessionID（很多无规律的字符串组合）和会话结束时间。服务器用cookie把这两个发送给浏览器，把sessionID加入到cookie里边。会话结束时间则是cookie的有效期。浏览器拿到cookie后进行保存，浏览器发送的每一个请求都会附上cookie也就是浏览器的下次访问会自动发送sessionID给服务器，直到cookie的有效期结束之后浏览器就会自动删除这个cookie。~



- Session is created and saved on the server. The server dominates everything.~Session诞生并保存在服务器。服务器主导一切。~
- Cookies are data carriers. Put session in the cookie and send it to the client.~Cookie是数据载体。把sessin放在cookie中送到客户端。~
- Token is born on the server and saved in the browser.~Token诞生在服务器，保存在浏览器。~



## Use hook

To make reactive value, to change the value whenever we want. We pass in an initial value and we can output that value just call the set function  to update.

```react
import {useState} from "react";

const Home =()=>{
    const [name,setName] = useState("Candy");
    const [age,setAge] = useState(25);
    
    const handleClick = ()=>{
		setName("Olivia");
    	setAge(21);
    }
    
    return(
        <div className="home">
            <h2>HomePage</h2>
            <p>{name} is {age} years old.</p>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}
```



## Node

Node applications are asynchronous by default. In Node it have single thread to handle  all requests. When the request arrives, that single request is used to handle that request, if you need to query a database, that thread does not need to wait for the database to return the data, that thread will be served to another client, when the database prepares the result it puts a message in Event Queue.

Node is continously monitor this quene in the background, when it finds a event in the queue, it will take it out and processing.

We can serve more clients without the need to throw in more hardware.





# Details of the project

## Login and Register Page

![1678067232684](../Blog/README.assets/1678067232684.png)

![1678067306876](../Blog/README.assets/1678067306876.png)

