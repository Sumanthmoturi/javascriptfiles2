//Object.freeze method
let object=Object.freeze({value:5})
object.value=10;
console.log(object.value)

//A project robot full solving in oneplace
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
  ];
  function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (graph[from] == null) {
        graph[from] = [to];
      } else {
        graph[from].push(to);
      }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
  const roadGraph = buildGraph(roads);
  
  function VillageState(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  
  VillageState.prototype.move = function (destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return { place: destination, address: p.address };
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  };
  function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
    }
  }
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }
  
  function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
  }
  VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({ place, address });
    }
    return new VillageState("Post Office", parcels);
  };
  const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];
  
  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
  }
  function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
      let { at, route } = work[i];
      for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({ at: place, route: route.concat(place) });
        }
      }
    }
  }
  
  function goalOrientedRobot({ place, parcels }, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return { direction: route[0], memory: route.slice(1) };
  }
  
  // Running the simulation with random robot
  runRobot(VillageState.random(), randomRobot);
  
  // Running the simulation with route-following robot
  runRobot(VillageState.random(), routeRobot, []);
  
  // Running the simulation with goal-oriented robot
  runRobot(VillageState.random(), goalOrientedRobot, []);
  

//Explanation of project code
// Define the roads between locations and build a graph from these connections.Each entry represents a bidirectional road between two locations
// Create a `VillageState` to represent the current state of the village.This includes the current location and parcels that need to be delivered
// Implement a method to move to a new location, updating the parcel locations if needed.Only move if the destination is directly reachable, and remove delivered parcels
// Define a function to run a robot with a specific behavior and memory.The robot will move according to its strategy until all parcels are delivered
// Implement a `randomRobot` that makes random moves from the current location.This is used to test how a robot performs without any strategic planning
// Implement a `routeRobot` that follows a predefined route.This ensures that the robot follows a fixed path, useful for comparison
// Implement a `goalOrientedRobot` that finds the shortest route to the nearest parcel.The robot will first deliver any parcels at the current location, then move towards the destination
// Run simulations with different robots (random, route-following, goal-oriented).Each run will demonstrate the effectiveness of the robot's strategy in delivering parcels