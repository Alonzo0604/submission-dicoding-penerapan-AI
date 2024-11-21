const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError.js");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    if (confidenceScore > 50) {
      result = "Cancer";
      suggestion = "Segera periksa ke dokter! Konfirmasi hasil pemeriksaan.";
    } else {
      result = "Non-cancer";
      suggestion = "Penyakit kanker tidak terdeteksi. Tetap menjaga kesehatan!";
    }

    return { result, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;