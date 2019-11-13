import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should update player score', () => {
  const appComponent = shallow(<App />);

  const players = [
    {
      name: 'Kunegunda',
      score: -5,
    },
    {
      name: 'Antoś',
      score: -1,
    },
  ];

  appComponent.setState({ players });

  const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');

  // Czy mogę w jednym tescie sprawdzać 2 graczy ?
  onScoreUpdate(0, 5);
  onScoreUpdate(1, 5);

  const playersAfterUpdate = appComponent.state('players');
  expect(playersAfterUpdate[0].score).toEqual(0);
  expect(playersAfterUpdate[1].score).toEqual(4);

});

it('should check app state for new player after call onPlayerAdd', () => {
  const appComponent = shallow(<App />);

  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
  
  onPlayerAdd('Ania');

  const players = appComponent.state('players');

  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual('Ania');
  expect(players[0].score).toEqual(0);

});

it('should remove player from state after call onPlayerRemove', () => {
  const appComponent = shallow(<App />);

  const players = [
    {
      name: 'Kunegunda',
      score: 5,
    },
    {
      name: 'Antoś',
      score: 0,
    },
  ];

  appComponent.setState({ players });

  const onPlayerRemove = appComponent.find(PlayersList).prop('onPlayerRemove');

  onPlayerRemove(1);

  const playersAfterDelete = appComponent.state('players');
  
  expect(playersAfterDelete.length).toEqual(1);
  expect(playersAfterDelete[0].name).toEqual('Kunegunda');
  expect(playersAfterDelete[0].score).toEqual(5);
});