const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API tests', () => {
    it('R should return a list of data', async () => {
        chai.request('http://localhost:3000').get('/posts')
            .end((err, response) => {

                expect(response).to.have.status(200);
                expect(response.body).to.be.an('array');
            });
    });

    it('R should return title "json api tutorial"', async () => {
        chai.request('http://localhost:3000').get('/posts/2')
            .end((err, response) => {

                expect(response).to.have.status(200);
                expect(response.body.title).to.be.equal('json api tutorial');
            });
    });

    it('C should add data with status code 201 and new title', async () => {
        const newItem = {
            "title": "JSON API Tutorial 2",
            "content": "Learn how to build a JSON API 2",
            "author": "Jane Smith 2"
        }
        chai.request("http://localhost:3000").post('/posts')
            .send(newItem)
            .end((err, response) => {

                expect(response).to.have.status(201)
                expect(response.body.title).to.be.equal("JSON API Tutorial 2")
            })
    })

    it('U should update data with status code 200 and new bio in prodile', async () => {
        const profileId = 1
        chai.request("http://localhost:3000").put(`/profiles/${profileId}`)
            .send({ "bio": "updated bio" }).end((err, res) => {

                expect(res).to.have.status(200)
                expect(res.body.bio).to.be.equal("updated bio")
            })
    })

    it('C should add new profile with status code 201 and new bio in profile', async () => {
        const newProfile = {
            "bio": "added new bio"
        }
        chai.request("http://localhost:3000").post("/profiles").send(newProfile)
            .end((err, res) => {

                expect(res).to.have.status(201)
                expect(res.body.bio).to.be.equal(newProfile.bio)
            })
    })

    it('C should add new like with status code 201 and new data', async () => {
        const newLike = {
            "postid": "1",
            "userid": "2"
        }
        chai.request("http://localhost:3000").post("/likes").send(newLike)
            .end((err, res) => {

                expect(res).to.have.status(201)
                expect(res.body.postid).to.be.equal(newLike.postid)
                expect(res.body.userid).to.be.equal(newLike.userid)
            })
    })
    it('C should add new comment with status code 201 and new comment', async () => {
        const newData = {
            "postid": "1",
            "author": "kirill",
            "content": "nice gg"
        }
        chai.request("http://localhost:3000").post("/comments").send(newData)
            .end((err, res) => {

                expect(res).to.have.status(201)
                expect(res.body.postid).to.be.equal(newData.postid)
                expect(res.body.author).to.be.equal(newData.author)
            })
    })
    it('R post 105 should exist', async () => {
        chai.request('http://localhost:3000').get('/posts/105')
            .end((err, response) => {

                expect(response).to.have.status(200);
            });
    })
    it('R profile 2 bio should be i love coding and learning new technologies.', async () => {
        chai.request('http://localhost:3000').get('/profiles/2')
            .end((err, response) => {

                expect(response).to.have.status(200);
                expect(response.body.bio).to.be.equal("i love coding and learning new technologies.")
            });
    })
    it("D should delete post 110", async () => {
        const postId = 109
        chai.request('http://localhost:3000')
            .delete(`/posts/${postId}`)
            .end((err, res) => {

                expect(res).to.have.status(204);
            })
    })
    it("D should delete profile 4", async () => {
        const profileId = 4
        chai.request('http://localhost:3000')
            .delete(`/profiles/${profileId}`)
            .end((err, res) => {

                expect(res).to.have.status(204);
            })
    })
    it("D should delete like 12", async () => {
        const likeId = 12
        chai.request('http://localhost:3000')
            .delete(`/likes/${likeId}`)
            .end((err, res) => {

                expect(res).to.have.status(204);
            })
    })
    it("R comment 2 author should be bob", async () => {
        chai.request('http://localhost:3000').get("/comments/2")
            .end((err, res) => {

                expect(res.body.author).to.be.equal("bob")
            })
    })
    it('U should update comment with status code 200 and new content', async () => {
        const id = 4
        chai.request("http://localhost:3000").put(`/profiles/${id}`)
            .send({ "content": "nice" }).end((err, res) => {

                expect(res).to.have.status(200)
                expect(res.body.content).to.be.equal("nice")
            })
    })
    it('U should update like with status code 200 and new postId', async () => {
        const id = 3
        chai.request("http://localhost:3000").put(`/likes/${id}`)
            .send({ "postId": 4 }).end((err, res) => {

                expect(res).to.have.status(200)
                expect(res.body.postId).to.be.equal(4)
            })
    })
})