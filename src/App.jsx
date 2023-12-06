import { useEffect, useState, useRef, createContext, useContext, useReducer } from 'react';
const ThemeContext = createContext('light');
function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: {
        ...state,
        age: state.age + 1
      }
    };
  }
  throw Error('Unknown action.');
}

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [isAdded, setIsAdded] = useState(false);
  const [currentTodo, setCurrentTodo] = useState('');
  const [theme, setTheme] = useState('light');
  const [person, setPerson] = useState('Alice');
  const [state, dispatch] = useReducer(reducer, { age: 42 });
    useEffect(()=>{
        console.log('component mount')
        let ignore = false;

        return () => {
          ignore = true;
          console.log('component unmount')}
    },[])
  const handleTodos = () => {
    // Mettre à jour le tableau des todos en ajoutant un nouveau todo
    setTodos([...todos, { name: currentTodo }]);
    setCurrentTodo(''); // Réinitialiser le champ de saisie après l'ajout
    setIsAdded(true); // Marquer comme ajouté après l'ajout
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("envoyé", todos);
  };
console.log(theme)
  return (
    <>      
    <ThemeContext.Provider value={theme}>
      <p>header</p>

      <Form />
    </ThemeContext.Provider>
    <Button onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}>
        Toggle theme
      </Button>

    <p>TodoList </p>
      <p>{isAdded ? 'Ajouté avec succès' : 'Supprimer avec succès'}</p>

      <form onSubmit={handleSubmit}>
        <input
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
          placeholder='todos'
          autoFocus
        />
        <button type="button" onClick={handleTodos}>
          Ajouter
        </button>
        <button type="submit">
          Envoyer
        </button>
         </form>

      <ul>
        {todos.map(todo => <LiComp key={todo.name} todo={todo} onAddSuccess={setIsAdded} /> 
        )}
      </ul>
      <button onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
      <ThemeContext.Provider value="black">
        <p>footer</p>
      </ThemeContext.Provider>
      </>

  );
}

export function LiComp({ todo, onAddSuccess }) {

  const refLi = useRef()
  function handleDelete(){
    refLi.current.remove();
    onAddSuccess(false)
  }

  return (
    <li ref={refLi} onClick={() => onAddSuccess(true)} key={todo.name}>{todo.name} <button onClick={handleDelete}>Delete</button>  </li>
    
  );
}  

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
  }


  function Form({ children }) {
    return (
      <Panel title="Welcome">
        <Button>Sign up</Button>
        <Button>Log in</Button>
      </Panel>
    );
  }
  function Panel({ title, children }) {
    const theme = useContext(ThemeContext);
    const className = 'panel-' + theme;
    return (
      <section className={className}>
        <h1>{title}</h1>
        {children}
      </section>
    )
  }
const initialTodos = [
  {
    name: "todos1"
  },
  {
    name: "todos2"
  }
];



