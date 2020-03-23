import moment from 'moment/min/moment-with-locales';
import * as types from '../../actions/posts/types';

const initialState = {
  postsList: [
    {
      id: '1',
      profileImage: 'https://i.pravatar.cc/150?img=7',
      name: 'Alex Santos',
      isEdited: true,
      postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
      upVotes: 15,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-03 14:00:00').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: '2',
      profileImage: 'https://i.pravatar.cc/150?img=45',
      name: 'Marina Medeiros',
      isEdited: false,
      postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
      upVotes: 15,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-05 14:00:00').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: '3',
      profileImage: 'https://i.pravatar.cc/150?img=68',
      name: 'Rodrigo Hassum',
      isEdited: true,
      postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
      upVotes: 15,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-06 14:00:00').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: '4',
      profileImage: 'https://i.pravatar.cc/150?img=14',
      name: 'Angelo Strobel',
      isEdited: true,
      postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
      upVotes: 15,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-07 14:50:00').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: '5',
      profileImage: 'https://i.pravatar.cc/150?img=15',
      name: 'Vinicius Moraes',
      isEdited: true,
      postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
      upVotes: 15,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-10 14:00:00').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: '6',
      profileImage: 'https://i.pravatar.cc/150?img=49',
      name: 'Andrea Oliveira',
      isEdited: true,
      postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
      upVotes: 15,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-18 14:00:00').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: '7',
      profileImage: 'https://i.pravatar.cc/150?img=69',
      name: 'Marcos (The Boss)',
      isEdited: false,
      postContent: 'O dev que fez esse App precisa ser contratado urgentemente. Manda ele passar no RH.',
      upVotes: 1265,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-18 14:00:00').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id: '8',
      profileImage: 'https://i.pravatar.cc/150?img=21',
      name: 'Amanda Lauren',
      isEdited: true,
      postContent: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla.',
      upVotes: 15,
      downVotes: 0,
      ownerID: '',
      date: moment('2020-03-19 14:00:00').format('YYYY-MM-DD HH:mm:ss')
    },
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    /* case types.PERSIST_REHYDRATE: {
      return { ...state, ...initialState };
    } */
    case types.PURGE: {
      console.log('PURGING STORE!!!!');
      return { ...initialState };
    }
    case types.ADD_POST: {
      console.log('Saving post.');
      return {
        ...state,
        postsList: [...state.postsList, action.payload],
      };
    }
    default:
      return state;
  }
};
