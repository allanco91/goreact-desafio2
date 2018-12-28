import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories, del, update }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <button type="button" onClick={() => del(repository.id)}>
            <i className="fa fa-times-circle fa-2x" />
          </button>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            <i className="fa fa-star" />
            {' '}
            {repository.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            <i className="fa fa-code-fork" />
            {' '}
            {repository.forks_count}
            {' '}
            <small>forks</small>
          </li>
          <li>
            <i className="fa fa-exclamation-circle" />
            {' '}
            {repository.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            <i className="fa fa-github" />
            {' '}
            {repository.lastCommit}
            {' '}
            <small>last commit</small>
          </li>
        </ul>
        <button type="button" onClick={() => update(repository.id)}>
          <i className="fa fa-refresh fa-2x" />
        </button>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,
  del: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default CompareList;
