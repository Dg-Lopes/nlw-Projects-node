/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import "./database";

import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { routes } from "./routes";
import ejs from "ejs";
import path from "path";

const app = express();
export const http = createServer(app);
export const io = new Server(http);

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.get("/pages/clients", (request, response) => {
	return response.render("html/client.html");
});

app.get("/pages/admin", (request, response) => {
	return response.render("html/admin.html");
});

io.on("connection", (socket: Socket) => {
	console.log("User connected:", socket.id);
});

app.use(express.json());
app.use(routes);