import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('repositories')) || [];

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem(
        'repositories',
        JSON.stringify([...localRepositories, repository]),
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelRepository = async (id) => {
    const { repositories } = this.state;
    const index = repositories.findIndex(repo => repo.id === id);

    repositories.splice(index, 1);

    this.setState({ repositories });

    await localStorage.setItem('repositories', JSON.stringify(repositories));
  };

  handleUpdateRepository = async (id) => {
    this.setState({ loading: true });

    const { repositories } = this.state;
    const index = repositories.findIndex(repo => repo.id === id);

    try {
      const { data: repository } = await api.get(
        `/repos/${repositories[index].owner.login}/${repositories[index].name}`,
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      repositories[index] = repository;

      this.setState({
        repositories,
        repositoryError: false,
      });

      await localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      loading, repositoryError, repositoryInput, repositories,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          del={e => this.handleDelRepository(e)}
          update={e => this.handleUpdateRepository(e)}
        />
      </Container>
    );
  }
}
