const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOneId, 
    userOne, 
    setupDatabase, 
    userTwoId, 
    userTwo, 
    taskOne, 
    taskTwo } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', 'Bearer '+userOne.tokens[0].token)
        .send({
            description: "From test"
        })
        .expect(201)
    
        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toBe(false)
})

test('Should get task for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer '+userOne.tokens[0].token)
        .expect(200)

        expect(response.body.length).toEqual(2)
})

test('Should not delete task one by user two', async () => {
    const response = await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', 'Bearer '+userTwo.tokens[0].token)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should delete task by user', async () => {
    const response = await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', 'Bearer '+userOne.tokens[0].token)
        .send()
        .expect(200)
})

// extra test ideas at:
// https://gist.github.com/andrewjmead/988d5965c609a641202600b073e54266