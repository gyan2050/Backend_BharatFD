// const redis = require("redis");

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URI || "redis://localhost:6379",
// });

// redisClient
//   .connect()
//   .then(() => console.log("Redis connected"))
//   .catch((err) => console.error("Redis error:", err));

// module.exports = redisClient;



const redis = require("redis");

let redisClient;

if (process.env.NODE_ENV === "test") {
  redisClient = {
    get: jest.fn().mockResolvedValue(null),
    setEx: jest.fn().mockResolvedValue(null),
    flushAll: jest.fn().mockResolvedValue(null),
    connect: jest.fn().mockResolvedValue(null),
    on: jest.fn(),
  };
} else {
  redisClient = redis.createClient({ url: process.env.REDIS_URI || "redis://localhost:6379" });

  redisClient.connect().catch((err) => console.error("Redis error:", err));
  redisClient.on("error", (err) => console.error("Redis error:", err));
}

module.exports = redisClient;
