import { useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { GET_NOTES } from '../queries/noteQueries';
import Spinner from './Spinner';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';


export default function EditorSidebar() {
    const { loading, error, data } = useQuery(GET_NOTES);
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return (
        <>{!loading && !error &&
          <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {data.notes.map((note) => {
                  return (
                    <li>
                      <Link to={`/notes/${note.id}`}>
                        <span>{note.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
        }</>
      );
    
}