import PlayersList from './PlayersList';
import Player from '../Player/Player';
import React from 'react';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<PlayersList players={[]} />);
});

it('renders correct number of players', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ]
    const playerComponent = shallow(<PlayersList players={players} />);

    const expectedPlayersNumber = playerComponent.find(Player).length;
    expect(expectedPlayersNumber).toEqual(2);
    

  });

  it('should call onScoreUpdate', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ]
    const mockedOnScoreUpdate = jest.fn();
    const playerComponent = shallow(<PlayersList players={players} onScoreUpdate={mockedOnScoreUpdate} />);

    const firstPlayer = playerComponent.find(Player).last();

    const onPlayerScoreChange = firstPlayer.prop('onPlayerScoreChange');
    
    onPlayerScoreChange(8);

    expect(mockedOnScoreUpdate).toBeCalledWith(1, 8);
  });

  it('should call onPlayerRemove with 1 when onPlayerRemove is called in second player', () => {
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
  
    const mockedOnPlayerRemove = jest.fn();
  
    const playerComponent = shallow(<PlayersList players={players} onPlayerRemove={mockedOnPlayerRemove} />);
  
    const delPlayer = playerComponent.find(Player).at(0);
  
    const onPlayerRemove = delPlayer.prop('onPlayerRemove');
  
    onPlayerRemove();
  
    expect(mockedOnPlayerRemove).toBeCalledWith(0);
  });