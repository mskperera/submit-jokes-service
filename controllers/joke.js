const { getJokeTypes_srv } = require("../services/joke");

// In-memory "database" of jokes
let submittedJokes = [
  { id: 1, typeId: 1, content: "This is a funny joke!", approved: false },
  {
    id: 2,
    typeId: 2,
    content: "Why did the programmer quit? Because he didn't get arrays!",
    approved: false,
  },
  {
    id: 3,
    typeId: 1,
    content: "Why don’t skeletons fight each other? They don’t have the guts.",
    approved: false,
  },
  {
    id: 4,
    typeId: 2,
    content:
      "Why do programmers prefer dark mode? Because the light attracts bugs!",
    approved: false,
  },
  {
    id: 5,
    typeId: 1,
    content:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    approved: false,
  },
];

exports.getAllSubmittedJokes = async (req, res) => {
  try {
    const { typeId } = req.query;
    const filteredJokes = typeId
      ? submittedJokes.filter((joke) => joke.typeId == typeId)
      : submittedJokes;

    res.json(filteredJokes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNewJoke = async (req, res) => {
  try {
    res.json(submittedJokes.filter((joke) => !joke.approved)[0]);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.updateJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, typeId } = req.body;

    if (!content) res.status(400).json({ error: "content is required." });
    if (!typeId) res.status(400).json({ error: "typeId is required." });

    const joke = submittedJokes.find((joke) => joke.id == id);

    if (joke) {
      if (content) joke.content = content;
      if (typeId) joke.typeId = typeId;
      res.json({ message: "Joke updated successfully", joke });
    } else {
      res.status(404).json({ message: "Joke not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.approveJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const joke = submittedJokes.find((joke) => joke.id == id);

    if (joke) {
      joke.approved = true;
      res.json({ message: "Joke approved", joke });
    } else {
      res.status(404).json({ message: "Joke not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.rejectJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const index = submittedJokes.findIndex((joke) => joke.id == id);

    if (index !== -1) {
      submittedJokes.splice(index, 1);
      res.json({ message: "Joke rejected and removed" });
    } else {
      res.status(404).json({ message: "Joke not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.submitJoke = async (req, res) => {
  try {
    const { content, typeId } = req.body;

    if (!content || !typeId) {
      return res
        .status(400)
        .json({ message: "Content and typeId are required" });
    }

    const newJoke = {
      id: submittedJokes.length + 1,
      content,
      typeId,
      approved: false,
    };
    submittedJokes.push(newJoke);

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
