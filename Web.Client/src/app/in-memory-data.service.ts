import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const patterns = [
        {
          id: 17,
          name: 'Architect also implements',
          // tslint:disable-next-line:max-line-length
          description: 'The project needs the necessary architectural breadth to cover its markets and to ensure smooth evolution, but it can’t be blindsided by pragmatic engineering and implementation concerns. Furthermore, the project needs to carry through a singular architectural vision from conception to implementation if it is to have conceptual integrity.',
          rating: 4.4,
          published: true,
        },
        {
          id: 18,
          name: 'Standards linking locations' ,
          // tslint:disable-next-line:max-line-length
          description: 'The project was spread across three states and two countries, though most of the work centered in two states. Each of those two locations built software for the locations’ respective hardware boxes, and those boxes communicated closely with each other. There of course was a standard message protocol, but it wasn’t articulated anywhere: each location used its own C language structures to define its understanding of the messages. Each location emphasized the message fields most of interest to it; in some cases, one location would give a field one name while another location gave it another name. It doesn’t take much imagination to envision the confusion that ensued.',
          rating: 3,
          published: false,
        }
    ];
    return {patterns};
  }
}
