document.getElementById('analyze-btn').addEventListener('click', async function () {
    const repoUrl = document.getElementById('repo-url').value;
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;

    if (repoUrl.match(regex)) {
        const [, owner, repo] = repoUrl.match(regex);
        const repoDetails = await fetchRepositoryDetails(owner, repo);
        const creatorDetails = await fetchCreatorDetails(owner);

        displayRepositoryDetails(repoDetails);
        displayCreatorDetails(creatorDetails);
    } else {
        alert('Please enter a valid GitHub repository URL!');
    }
});

async function fetchRepositoryDetails(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const data = await response.json();
    return data;
}

async function fetchCreatorDetails(owner) {
    const response = await fetch(`https://api.github.com/users/${owner}`);
    const data = await response.json();
    return data;
}

function displayRepositoryDetails(details) {
    const repoDetailsContainer = document.getElementById('repo-details');
    repoDetailsContainer.innerHTML = `
        <h3>Repository Details</h3>
        <p><strong>Name:</strong> ${details.name}</p>
        <p><strong>Description:</strong> ${details.description || 'No description available.'}</p>
        <p><strong>Stars:</strong> ${details.stargazers_count}</p>
        <p><strong>Forks:</strong> ${details.forks_count}</p>
        <p><strong>Language:</strong> ${details.language}</p>
    `;
}

function displayCreatorDetails(details) {
    const creatorDetailsContainer = document.getElementById('creator-details');
    creatorDetailsContainer.innerHTML = `
        <h3>Creator Details</h3>
        <img src="${details.avatar_url}" alt="${details.login}" style="width: 100px; border-radius: 50%; display: block; margin: 0 auto;">
        <p><strong>Name:</strong> ${details.name || 'Not available'}</p>
        <p><strong>Bio:</strong> ${details.bio || 'No bio available'}</p>
        <p><strong>Location:</strong> ${details.location || 'Not available'}</p>
    `;
}
