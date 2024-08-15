import Producto from "../models/Producto.js";
import cloudinary from "cloudinary";
import fs from "fs-extra";

const registrarProducto = async (req, res) => {
	const { image } = req.files;

	if (Object.values(req.body).includes(""))
		return res
			.status(400)
			.json({ msg: "Lo sentimos, debes llenar todos los campos" });

	if (!image)
		return res
			.status(400)
			.json({ msg: "Lo sentimos, debes subir una imagen" });

	if (await Producto.findOne({ nombre: req.body.nombre }))
		return res
			.status(400)
			.json({ msg: "Lo sentimos, el Producto ya existe" });

	const cloudinaryResponse = await cloudinary.uploader.upload(
		image.tempFilePath,
		{ folder: "products" }
	);

	req.body.foto = {
		url: cloudinaryResponse.secure_url,
		public_id: cloudinaryResponse.public_id,
	};

	await fs.unlink(image.tempFilePath);

	const nuevoProducto = new Producto(req.body);

	await nuevoProducto.save();

	res.status(200).json(nuevoProducto);
};

const obtenerProductos = async (req, res) => {
	const Productos = await Producto.find();

	if (!Productos)
		return res
			.status(404)
			.json({ msg: "Lo sentimos, no se encontraron Productos" });

	res.status(200).json(Productos);
};

const obtenerProductosPorCategoria = async (req, res) => {
	const Productos = await Producto.find()
		.where("categoria")
		.equals(req.params.categoria);

	if (!Productos)
		return res
			.status(404)
			.json({ msg: "Lo sentimos, no se encontraron Productos" });

	res.status(200).json(Productos);
};

const detalleProducto = async (req, res) => {
	try {
		const producto = await Producto.findById(req.params.id);
		res.status(200).json(producto);
	} catch (error) {
		res.status(404).json({
			msg: "Lo sentimos, no se encontró el Producto",
		});
	}
};

const actualizarProducto = async (req, res) => {
	const { id } = req.params;

	if (Object.values(req.body).includes(""))
		return res
			.status(400)
			.json({ msg: "Lo sentimos, debes llenar todos los campos" });

	if (req.files) {
		const cloudinaryResponse = await cloudinary.uploader.upload(
			req.files.image.tempFilePath,
			{ folder: "products" }
		);
		req.body.foto = {
			url: cloudinaryResponse.secure_url,
			public_id: cloudinaryResponse.public_id,
		};

		await fs.unlink(req.files.image.tempFilePath);
	}

	const ProductoBDD = await Producto.findByIdAndUpdate(id, req.body);

	if (!ProductoBDD)
		return res
			.status(404)
			.json({ msg: "Lo sentimos, no se encontró el Producto" });

	res.status(200).json({ msg: "Producto actualizado correctamente" });
};

const eliminarProducto = async (req, res) => {
	const { id } = req.params;

	const ProductoBDD = await Producto.findByIdAndDelete(id);

	if (!ProductoBDD)
		return res
			.status(404)
			.json({ msg: "Lo sentimos, no se encontró el Producto" });

	res.status(200).json({ msg: "Producto eliminado correctamente" });
};

export {
	registrarProducto,
	detalleProducto,
	eliminarProducto,
	obtenerProductos,
	actualizarProducto,
	obtenerProductosPorCategoria,
};
