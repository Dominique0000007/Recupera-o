import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import TaskDetails from "./components/TaskDetails";

import "./App.css";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const BASE_URL = "https://jsonplaceholder.cypress.io/todos";

	useEffect(() => {
		const fetchTasks = async () => {
			setIsLoading(true);
			setErrorMessage("");
			try {
				const { data } = await axios.get(`${BASE_URL}?_limit=10`);
				setTasks(data);
			} catch (error) {
				setErrorMessage("Falha ao carregar tarefas. Tente novamente.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchTasks();
	}, []);

	const handleTaskClick = async (taskId) => {
		try {
			const taskToToggle = tasks.find((t) => t.id === taskId);
			if (!taskToToggle) return;
			const { data } = await axios.patch(`${BASE_URL}/${taskId}`, {
				completed: !taskToToggle.completed,
			});
			const updatedTasks = tasks.map((task) =>
				task.id === taskId ? { ...task, completed: data.completed } : task
			);
			setTasks(updatedTasks);
		} catch (error) {
			setErrorMessage("Não foi possível atualizar a tarefa.");
		}
	};

	const handleTaskAddition = async (taskTitle) => {
		const trimmed = (taskTitle || "").trim();
		if (!trimmed) return;
		try {
			const { data } = await axios.post(BASE_URL, {
				title: trimmed,
				completed: false,
			});
			const taskWithId = { ...data, id: data.id || uuidv4() };
			setTasks([...tasks, taskWithId]);
		} catch (error) {
			setErrorMessage("Não foi possível adicionar a tarefa.");
		}
	};

	const handleTaskDeletion = async (taskId) => {
		try {
			await axios.delete(`${BASE_URL}/${taskId}`);
			const newTasks = tasks.filter((task) => task.id !== taskId);
			setTasks(newTasks);
		} catch (error) {
			setErrorMessage("Não foi possível remover a tarefa.");
		}
	};

	return (
		<Router>
			<div className="container">
				<Header />
				{isLoading && <p>Carregando tarefas...</p>}
				{!!errorMessage && <p style={{ color: "crimson" }}>{errorMessage}</p>}
				<Route
					path="/"
					exact
					render={() => (
						<>
							<AddTask handleTaskAddition={handleTaskAddition} />
							<Tasks
								tasks={tasks}
								handleTaskClick={handleTaskClick}
								handleTaskDeletion={handleTaskDeletion}
							/>
						</>
					)}
				/>
				<Route path="/:taskTitle" exact component={TaskDetails} />
			</div>
		</Router>
	);
};

export default App;
