import { BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import { RegisterToken } from "../generated/Marketplace/Marketplace"
import { Transfer } from "../generated/templates/Token/Token"
import { Account, Balance, Room, User, Membership } from "../generated/schema"
import { Token } from "../generated/templates"


const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
function createAccount(address: string): void {
  let account = Account.load(address);
  if (!account) {
    account = new Account(address);
    account.save();
  }
}

function createUser(address: string): User {
  let id = address;
  let user = User.load(id);
  if (!user) {
    user = new User(address);
    // user.memberships = [];
    user.save();
  }
  return user;
}

function createRoom(tokenAddress: Bytes): Room {
  let id = tokenAddress.toHex();
  let room = Room.load(id);
  if (!room) {
    room = new Room(id);
    // room.memberships = []; 
    room.save();
  }
  return room;
}


export function handleRegisterToken(event: RegisterToken): void {
  Token.create(event.params.tokenAddress);

  //init user
  let user = createUser(event.params.ownerAddress.toHex());

  //init room
  let room = createRoom(event.params.tokenAddress);

  // associate the user with the room
  // createMembership(user, room);
  addUserToRoom(user,room)

}

export function handleTransfer(event: Transfer): void {
  log.error(" Blocknumber {} transaction hash {}", [event.block.number.toString(), event.transaction.hash.toHexString()])
  changeBalance(event.params.to, event.params.from, event.params.value, event.address)
}

function addUserToRoom(user: User, room: Room): void {
  // Check user is already member 
  const membershipId = user.id.concat(room.id)
  let membership = Membership.load(membershipId);

  if (!membership) {
    // Create member
    let membership = new Membership(membershipId);
    membership.user = user.id;
    membership.room = room.id;
    membership.save();


    // room.memberships.push(membershipId);
    // room.save();
    // user.memberships.push(membershipId);
    // user.save();
  }
}

function changeBalance(to: Bytes, from: Bytes, amount: BigInt, tokenAddress: Bytes): void {

  let id = to.concat(tokenAddress);
  let balance = Balance.load(id.toHex());
  if (to.toHex() != ZERO_ADDRESS) {
    if (!balance) {
      createAccount(to.toHex());
      balance = new Balance(id.toHex());
      balance.token = tokenAddress;
      balance.account = to.toHex();
      balance.amount = BigInt.zero();
    }
    balance.amount = balance.amount.plus(amount);
    balance.save();

    if(balance.amount.gt(BigInt.fromI32(0)) ){
      let user = createUser(to.toHex());
      let room = createRoom(tokenAddress);
      addUserToRoom(user, room);
    }
  }

  if (from.toHex() != ZERO_ADDRESS) {
    createAccount(from.toHex());
    id = from.concat(tokenAddress);
    balance = Balance.load(id.toHex());
    if (!balance) {
      balance = new Balance(id.toHex());
      balance.token = tokenAddress;
      balance.account = from.toHex();
      balance.amount = BigInt.zero();
    }
    balance.amount = balance.amount.minus(amount);
    balance.save();

    if(balance.amount.gt(BigInt.fromI32(0))) {
      let user = createUser(from.toHex());
      let room = createRoom(tokenAddress);
      addUserToRoom(user, room);
    }
  }
}


