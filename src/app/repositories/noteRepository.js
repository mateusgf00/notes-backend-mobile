const db = require('../../database');


class noteRepository {
  async findAll(){
    const rows = await db.query('SELECT * FROM notes');

    return rows;
  }

  async findById(id){
    const [ row ] = await db.query('SELECT * FROM notes WHERE id = $1', [id]);

    return row;

  }

  async create({title, body}){
    const [ row ] = await db.query(`
    INSERT INTO notes(title, body)
    VALUES($1, $2)
    RETURNING *
    `, [title, body]);

    return row;
  }

  async update(id, {title, body}){
    const [ row ] = await db.query(`
    UPDATE notes
    SET title = $1, body = $2
    WHERE id = $3
    RETURNING *`, [title, body, id]);

    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`DELETE FROM notes where id = $1`,[id]);

    return deleteOp;
  }
}


module.exports = new noteRepository();