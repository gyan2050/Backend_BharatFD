const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const FAQ = require("../models/faqModel");



beforeAll(async () => {
  await mongoose.disconnect(); // Prevent multiple connections
  await mongoose.connect("mongodb://localhost:27017/testDB", { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});



// Test: Create a new FAQ
describe("POST /api/faqs", () => {
  it("should create a new FAQ", async () => {
    const res = await request(app).post("/api/faqs").send({
      question: "What is Node.js?",
      answer: "Node.js is a JavaScript runtime.",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.question).toBe("What is Node.js?");
  });
});

// Test: Fetch FAQs
describe("GET /api/faqs", () => {
  it("should return a list of FAQs", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// Test: Delete an FAQ
describe("DELETE /api/faqs/:id", () => {
  it("should delete an FAQ", async () => {
    const faq = await FAQ.create({
      question: "Sample FAQ",
      answer: "Sample answer",
    });

    const res = await request(app).delete(`/api/faqs/${faq._id}`);
    expect(res.statusCode).toBe(200);
  });
});
