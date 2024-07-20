/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import Todo from "./Todo";
import Repos from "./Repos"; // Import the new Repos component

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Task management
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedGithubUsername = localStorage.getItem("githubUsername");
    const storedLeetcodeUsername = localStorage.getItem("leetcodeUsername");

    if (storedGithubUsername && storedLeetcodeUsername) {
      setUsername(storedUsername);
      setGithubUsername(storedGithubUsername);
      setLeetcodeUsername(storedLeetcodeUsername);
      fetchGithubData(storedGithubUsername);
      fetchLeetcodeData(storedLeetcodeUsername);
    } else {
      setShowForm(true);
    }

    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const fetchGithubData = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setGithubData(data);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  const fetchLeetcodeData = async (username) => {
    try {
      const response = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      );
      const data = await response.json();
      setLeetcodeData(data);
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("githubUsername");
    localStorage.removeItem("leetcodeUsername");
    localStorage.removeItem("tasks"); // Clear tasks from localStorage
    setGithubUsername("");
    setLeetcodeUsername("");
    setGithubData(null);
    setLeetcodeData(null);
    setRepos([]);
    setTasks([]); // Clear tasks state
    setShowForm(true);
  };

  return (
    <div className=''>
      {showForm ? (
        <UserForm />
      ) : (
        <div className=''>
          <div className='flex justify-between p-5 mx-5'>
            <h1 className='text-2xl lg:text-3xl font-bold mb-4 text-blue-500'>
              {username + "'s"} Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className='mb-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300'>
              Logout
            </button>
          </div>

          <div className='mb-4'>
            <div className='flex flex-col lg:flex-row justify-between items-center'>
              <div>
                <img
                  src={githubData ? githubData.avatar_url : ""}
                  alt='Github profile pic'
                  className='mb-5 mx-5 h-20 w-20 rounded-full '
                />
              </div>
              <div className='p-5 flex gap-5'>
                <div>
                  <h2 className='lg:text-xl text-[18px] text-white  font-semibold mb-2'>
                    GitHub Statistics
                  </h2>
                  {githubData && (
                    <div className='bg-slate-400 p-3 lg:p-4 rounded-lg shadow-md'>
                      <p className='text-lg font-medium'>
                        Repositories: {githubData.public_repos}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className='lg:text-xl text-[18px] text-white  font-semibold mb-2'>
                    LeetCode Statistics
                  </h2>
                  {leetcodeData && (
                    <div className='bg-slate-400 p-3 lg:p-4 rounded-lg shadow-md'>
                      <p className='text-lg font-medium'>
                        Total Solved Problems: {leetcodeData.totalSolved}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row'>
              <div className='basis-1/2'>
                <Todo tasks={tasks} setTasks={setTasks} />
              </div>
              <div className='basis-1/2'>
                <Repos repos={repos} /> {/* Pass repos to Repos component */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
