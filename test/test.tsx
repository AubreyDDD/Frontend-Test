'use client'

import React from 'react';
import styles from './test.module.css';

export default function test (): JSX.Element {
    // Your Test Starts Here
    // State to store todo items and input value
    const [todos, setTodos] = React.useState<Array<{
        id: number;
        text: string;
        isEditing: boolean;
        completed: boolean;
    }>>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [error, setError] = React.useState('');

    // Handler for input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setError('');
    };

    // Handler for adding new todo
    const handleAddTodo = () => {
        if (inputValue.trim() === '') {
            setError('Please enter a task');
            return;
        }
        
        setTodos([
            ...todos,
            { 
                id: Date.now(), 
                text: inputValue.trim(), 
                isEditing: false,
                completed: false
            }
        ]);
        setInputValue('');
        setError('');
    };

    // Handler for deleting todo
    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Handler for toggling edit mode
    const handleToggleEdit = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        ));
    };

    // Handler for updating todo text
    const handleUpdateTodo = (id: number, newText: string) => {
        if (newText.trim() === '') {
            setTodos(todos.filter(todo => todo.id !== id));
            return;
        }
        
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText.trim(), isEditing: false } : todo
        ));
    };

    // Handler for enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    // Add handler for toggling completion status
    const handleToggleComplete = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className={styles.container}>
            {/* Input section */}
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter a new task"
                    className={styles.input}
                />
                <button 
                    onClick={handleAddTodo}
                    className={styles.addButton}
                >
                    Add
                </button>
            </div>

            {/* Error message */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Todo list */}
            <ul className={styles.todoList}>
                {todos.map(todo => (
                    <li key={todo.id} className={styles.todoItem}>
                        {todo.isEditing ? (
                            <input
                                type="text"
                                defaultValue={todo.text}
                                onBlur={(e) => handleUpdateTodo(todo.id, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUpdateTodo(todo.id, e.currentTarget.value);
                                    }
                                }}
                                className={styles.editInput}
                                autoFocus
                            />
                        ) : (
                            <div className={styles.todoContent}>
                                <div className={styles.todoLeft}>
                                    <button
                                        onClick={() => handleToggleComplete(todo.id)}
                                        className={`${styles.completeButton} ${todo.completed ? styles.completed : ''}`}
                                    >
                                        {todo.completed ? '✓' : '○'}
                                    </button>
                                    <span className={todo.completed ? styles.completedText : ''}>
                                        {todo.text}
                                    </span>
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button
                                        onClick={() => handleToggleEdit(todo.id)}
                                        className={styles.editButton}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        className={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};