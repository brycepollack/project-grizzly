import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_NOTE } from '../mutations/noteMutations';
import { GET_NOTES } from '../queries/noteQueries';

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("Hello world!");
  //const [phone, setPhone] = useState('');

  const [addNote] = useMutation(ADD_NOTE, {
    variables: { title, text },
    update(cache, { data: { addNote } }) {
      const { notes } = cache.readQuery({ query: GET_NOTES });

      cache.writeQuery({
        query: GET_NOTES,
        data: { notes: [...notes, addNote] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === '' ) {
      return alert('Please fill in a title');
    }

    addNote(title, text);

    setTitle('');
    //setText('');
  };

  return (
    <>
          <div className='container'>
              <form onSubmit={onSubmit}>
                  <div>
                      <label className='form-label'>Title</label>
                      <input
                          type='text'
                          className='form-control'
                          id='name'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                      />
                  </div>

                  <button
                      type='submit'
                      className='btn btn-secondary'
                  >
                      Submit
                  </button>
              </form>
          </div>
    </>
  );
}