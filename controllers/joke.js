const Joke = require("../mongoDb/models/Joke");
const { getJokeTypes_srv } = require("../services/joke");

exports.getAllSubmittedJokes = async (req, res) => {
  try {
    const { typeId } = req.query;
    const filter = typeId ? { typeId } : {};
    const jokes = await Joke.find(filter);
    res.json(jokes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNewJoke = async (req, res) => {
  try {
    const joke = await Joke.findOne({ approved: false });
    res.json(joke);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, typeId } = req.body;

    if (!content) return res.status(400).json({ error: "Content is required." });
    if (!typeId) return res.status(400).json({ error: "typeId is required." });

    const joke = await Joke.findById(id);

    if (joke) {
      joke.content = content;
      joke.typeId = typeId;
      await joke.save();
      res.json({ message: "Joke updated successfully", joke });
    } else {
      res.status(404).json({ message: "Joke not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.approveJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const joke = await Joke.findById(id);

    if (joke) {
      joke.approved = true;
      await joke.save();
      res.json({ message: "Joke approved", joke });
    } else {
      res.status(404).json({ message: "Joke not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.rejectJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const joke = await Joke.findByIdAndDelete(id);

    if (joke) {
      res.json({ message: "Joke rejected and removed" });
    } else {
      res.status(404).json({ message: "Joke not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.submitJoke = async (req, res) => {
  try {
    const { content, typeId } = req.body;

    if (!content || !typeId) {
      return res.status(400).json({ message: "Content and typeId are required" });
    }

    const newJoke = new Joke({
      content,
      typeId,
      approved: false,
    });

    await newJoke.save();
    res.status(201).json(newJoke);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getJokeTypes = async (req, res) => {
  try {
    const response = await getJokeTypes_srv();
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
