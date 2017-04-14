import mongoose from 'mongoose';
import fs from 'fs';
import crypto from 'crypto';
import config from '../etc/';

const md5sum = crypto.createHash('md5');

import '../models/Info';
import '../models/Questies';
import '../models/Reserv';
import '../models/Rewievs';
import '../models/Stock';
import '../models/Pages';

const Info = mongoose.model("Info");
const Questies = mongoose.model("Questies");
const Reserv = mongoose.model("Reserv");
const Rewievs = mongoose.model("Rewievs");
const Stock = mongoose.model("Stock");
const Page = mongoose.model("Page");


export function getInfo(){
	return Info.find();
}

export function createInfo(data){
	const info = new Info({
		site: data.site,
		address: data.address,
		number: data.number,
		image: data.image,
		text: data.text,
		instagramm: data.instagramm,
		vk: data.vk,
		createdAt: new Date(),
	});

	return info.save();
}

export function updateInfo(data){
	return Info.findById(data.id).update();
}

export function deleteInfo(id){
	return Info.findById(id).remove();
}

export function getQuesties(){
	return Questies.find();
}

export function createQuesties(data){
	var base64Data = data.image.replace(/^data:image\/png;base64,/, "");
	md5sum.update(base64Data);
	var d = md5sum.digest('hex');
	var filename = "./public/images/"+d+'.png';
	fs.writeFile(filename, base64Data, 'base64', (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});
	const questies = new Questies({
		name: data.name,
		type: data.type,
		image: filename.slice(8),
		description: data.description,
		time: data.time,
		price: data.price,
		price2:data.price2,
		difficulty_level: data.difficulty_level,
		createdAt: new Date(),
	});

	return questies.save();
}

export function updateQuesties(data){
	return Questies.findById(data.id).update();
}

export function deleteQuesties(id){
	return Questies.findById(id).remove();
}
export function getReserv(){
	return Reserv.find();
}

export function createReserv(data){
	const reserv = new Reserv({
		name: data.name,
		date: data.date,
		time:data.time,
		price:data.price,
		createdAt: new Date(),
	});

	return reserv.save();
}

export function updateReserv(data){
	return Reserv.findById(data.id).update();
}

export function deleteReserv(id){
	return Reserv.findById(id).remove();
}

export function getRewievs(){
	return Rewievs.find();
}

export function createRewievs(data){
	const rewievs = new Rewievs({
		author:data.author,
		rewiev:data.rewiev,
		rating:data.rating,
		createdAt:new Date(),
	});

	return rewievs.save();
}

export function updateRewievs(data){
	return Rewievs.findById(data.id).update();
}

export function deleteRewievs(id){
	return Rewievs.findById(id).remove();
}
export function getStock(){
	return Stock.find();
}

export function createStock(data){
	const stock = new Stock({
		stock: data.stock,
		time_out: data.time_out,
		text: data.text,
		createdAt: new Date(),
	});

	return stock.save();
}

export function updateStock(data){
	return Stock.findById(data.id).update();
}

export function deleteStock(id){
	return Stock.findById(id).remove();
}
export function getPages(){
	return Page.find();
}

export function createPage(data){
	const page = new Page({
		pageName:data.name,
	    access:data.userName,
	    pageSlug:data.slug,
	    pageTitle:data.title,
	    pageContent:data.content,
	    created: new Date(),
	});

	return page.save();
}

export function updatePage(data){
	return Page.findById(data.id).update();
}

export function deletePage(id){
	return Page.findById(id).remove();
}