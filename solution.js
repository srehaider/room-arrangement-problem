/*
  Find more about problem at https://github.com/srehaider/room-arrangement-problem
*/

const x = 2;
const y = 3;
const users = 6;

/*
  It takes dimensions of grid representing rooms and returns an array.
  Each index represents how many users can be placed in rooms at this cost
  e.g: For [ 3, 0, 2, 1, 0 ] shows we can place 3 users with 0(index) cost
  after placing 3 users we will have to pay at least 2(index) cost for
  placing one team and maximum 2 users can be placed at this cast.
  After placing 5 users to place 6th and last team we will have to pay
  3(index) cost and there will be no more users to place.
*/
function calculateCost(x, y) {
  const cost = [0, 0, 0, 0, 0];

  if (x * y === 0) return cost;

  cost[0] = Math.ceil(x * y / 2);

  if (x === 1 || y === 1) {
    cost[2] = x * y - cost[0];
    if (x % 2 === 0 || y % 2 === 0) {
      cost[1] = 1;
      cost[2] -= 1;
    }
    return cost;
  }

  cost[3] = x + y - 2;

  if (x % 2 === 0 || y % 2 === 0) {
    cost[2] = 2;
    cost[3] -= 2;
  }

  cost[4] = x * y - cost[0] - cost[1] - cost[2] - cost[3];

  return cost;
}

if (users > x * y) {
  console.log('invalid data')
} else {
  let totalCost = 0;
  let remainingUsers = users;
  const cost = calculateCost(x, y);
  // console.log(cost);
  for (let index = 0; remainingUsers; ++index) {
    if (remainingUsers > cost[index]) {
      totalCost += cost[index] * index;
      remainingUsers -= cost[index];
    } else {
      totalCost += remainingUsers * index;
      remainingUsers = 0;
    }
  }

  console.log(`[${x},${y},${users}]-> ${totalCost}`);
}