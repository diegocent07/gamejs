export default function createGame() {
                const state = {
                    players: {},
                    fruits: {},
                    screen: {
                        width: 10,
                        height: 10
                    }
                }

                function addPlayer(command) {
                    const playerId = command.playerId
                    const playerX = command.playerX
                    const playerY = command.playerY

                    state.players[playerId] = {
                        x: playerX,
                        y: playerY
                    }
                }

                function removePlayer(command) {
                    const playerId = command.playerId

                    delete state.players[playerId]
                }

                function addFruit(command) {
                    const fruitId = command.fruitId
                    const fruitX = command.fruitX
                    const fruitY = command.fruitY

                    state.fruits[fruitId] = {
                        x: fruitX,
                        y: fruitY
                    }
                }

                function removeFruit(command) {
                    const fruitId = command.fruitId

                    delete state.fruits[fruitId]
                }
            
            
                function movePlayer(command){
                    //console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

                    const acceptedMoves = {
                        ArrowUp(player) {
                            //console.log('Moving player up')
                            if (player.y - 1 >=0) {
                                player.y = player.y -1
                            }
                        },
                        ArrowRight(player) {
                            //console.log('Moving player right')
                            if (player.x + 1 < state.screen.width) {
                                player.x = player.x + 1
                            }
                        },
                        ArrowLeft(player) {
                            //console.log('Moving player left')
                            if (player.x - 1 >=0) {
                                player.x = player.x -1
                            }
                        },
                        ArrowDown(player) {
                            //console.log('Moving player down')
                            if (player.y + 1 < state.screen.height) {
                                player.y = player.y + 1
                            }
                        }
                    }

                    const keyPressed = command.keyPressed
                    const playerId = command.playerId
                    const player = state.players[command.playerId]
                    const moveFunction = acceptedMoves[keyPressed]

                    if (player && moveFunction){
                        moveFunction(player)
                        checkForFruitCollision(playerId)
                    }
                    return // TEMP

                    if (keyPressed === 'ArrowUp' && player.y - 1 >=0) {

                        player.y = player.y -1
                        return
                    }

                    if (keyPressed === 'ArrowRight' && player.x + 1 < screen.width) {
                        player.x = player.x + 1
                        return
                    }
                    if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
                        player.x = player.x - 1
                        return
                    }
                    if (keyPressed === 'ArrowDown' && player.y + 1 < screen.height) {
                        player.y = player.y + 1
                        return
                    }
                }

                function checkForFruitCollision(playerId) {
                        const player = state.players[playerId]

                        for (const fruitId in state.fruits) {
                            const fruit = state.fruits[fruitId]
                            console.log(`Checking ${playerId} and ${fruitId}`)

                            if (player.x === fruit.x && player.y === fruit.y) {
                                console.log(`COLLISION between ${playerId} and ${fruitId}`)
                                removeFruit({ fruitId: fruitId })
                            }
                        }
                    
                }
                
                return {
                    movePlayer,
                    addPlayer,
                    removePlayer,
                    addFruit,
                    removeFruit,
                    state
                }
            
            }