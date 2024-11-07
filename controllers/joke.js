


// In-memory "database" of jokes
let submittedJokes = [
    { id: 1, type: 'general', content: 'This is a funny joke!', approved: false },
    { id: 2, type: 'programming', content: 'Why did the programmer quit? Because he didn\'t get arrays!', approved: false },
  ];
  
exports.moderateJoke = async (req, res) => {
  try {

    res.json(submittedJokes.filter(joke => !joke.approved));

  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};


exports.editJoke = async (req, res) => {
    try {
  
        const { id } = req.params;
        const { content, type } = req.body;
        const joke = submittedJokes.find(joke => joke.id == id);
      
        if (joke) {
          if (content) joke.content = content;
          if (type) joke.type = type;
          res.json({ message: 'Joke updated successfully', joke });
        } else {
          res.status(404).json({ message: 'Joke not found' });
        }       
  
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  };


  exports.approveJoke = async (req, res) => {
    try {
        const { id } = req.params;
        const joke = submittedJokes.find(joke => joke.id == id);
      
        if (joke) {
            joke.approved = true;
            res.json({ message: 'Joke approved', joke });
          } else {
            res.status(404).json({ message: 'Joke not found' });
          }

    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  };

  
  exports.rejectJoke = async (req, res) => {
    try {
  
        const { id } = req.params;
        const index = submittedJokes.findIndex(joke => joke.id == id);
      
        if (index !== -1) {
          submittedJokes.splice(index, 1);
          res.json({ message: 'Joke rejected and removed' });
        } else {
          res.status(404).json({ message: 'Joke not found' });
        }

    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  };
