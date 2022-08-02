const noteRepository = require('../repositories/noteRepository');

class noteController {
  async show(request, response){
    const notes = await noteRepository.findAll();

    response.send(notes);
  }

  async showOne(request, response){
    const {id} = request.params;
    const note = await noteRepository.findById(id);

    response.send(note);
  }

  async create(request, response){
    const {title, body} = request.body;
    const note = await noteRepository.create({title, body});

    response.send(note);
  }

  async update(request, response){
    const {id} = request.params;
    const {title, body} = request.body;

    const noteExists = await noteRepository.findById(id);

    if(!noteExists){
      return response.status(400).json({ error: 'Note not found' });
    }

    const newNote = await noteRepository.update(id,{title, body});

    response.send(newNote);
  }

  async delete(request, response){
    const {id} = request.params;

    await noteRepository.delete(id);
    response.sendStatus(204);
  }

}

module.exports = new noteController();