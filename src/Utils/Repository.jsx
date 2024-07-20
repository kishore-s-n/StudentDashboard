/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Repository from "../Utils/Repository";

const Repos = ({ repos }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("none");
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    // Filter and sort repos based on search term and filter criteria
    const filterAndSortRepos = () => {
      if (!repos || !Array.isArray(repos)) {
        setFilteredRepos([]);
        return;
      }

      const filtered = repos
        .filter((repo) => {
          if (!repo.name) return false;
          return repo.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => {
          if (filterBy === "date_created") {
            return new Date(b.created_at) - new Date(a.created_at);
          } else if (filterBy === "last_updated") {
            return new Date(b.updated_at) - new Date(a.updated_at);
          }
          return 0;
        });

      setFilteredRepos(filtered);
    };

    filterAndSortRepos();
  }, [repos, searchTerm, filterBy]);

  const fetchCommits = async (repoName) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/kishore-s-n/${repoName}/commits`
      );
      const data = await response.json();
      setCommits(data);
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
  };

  const handleRepoClick = (repo) => {
    if (selectedRepo === repo) {
      setSelectedRepo(null);
      setCommits([]);
    } else {
      setSelectedRepo(repo);
      fetchCommits(repo.name);
    }
  };

  return (
    <div className='m-4'>
      <h3 className='text-lg font-semibold mb-2'>Repositories</h3>
      <div className='mx-3 mb-2 lg:mx-5 lg:mb-5 '>
        {/* Search Input */}
        <input
          type='text'
          placeholder='Search Repositories...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 border rounded-lg mb-2'
        />
        {/* Filter Dropdown */}
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className='p-2 border rounded-lg mb-2 ml-2'>
          <option value='none'>No Filter</option>
          <option value='date_created'>Date Created</option>
          <option value='last_updated'>Last Updated</option>
        </select>
      </div>
      <ul>
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <li
              key={repo.id}
              className='m-5 px-5 py-2 bg-slate-600 rounded-lg shadow-md cursor-pointer'
              onClick={() => handleRepoClick(repo)}>
              <Repository repo={repo} />
              {selectedRepo === repo && (
                <div className='mt-4'>
                  <h4 className='text-lg font-semibold mb-2'>Commits</h4>
                  {commits.length > 0 ? (
                    <ul>
                      {commits.map((commit) => (
                        <li key={commit.sha} className='mb-3'>
                          <a
                            href={commit.html_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-400 hover:underline'>
                            {commit.commit.message}
                          </a>
                          <p className='text-gray-300 text-sm'>
                            {new Date(
                              commit.commit.author.date
                            ).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-white'>No commits found</p>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <p className='text-white'>No repositories found</p>
        )}
      </ul>
    </div>
  );
};

export default Repos;
