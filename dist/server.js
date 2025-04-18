"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const story_routes_1 = require("./api/story/story.routes");
const auth_routes_1 = require("./api/auth/auth.routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const setupAls_middleware_1 = require("./midlewaers/setupAls.middleware");
const user_routes_1 = require("./api/user/user.routes");
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "production") {
  app.use(express_1.default.static(path_1.default.resolve("public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:4200",
      "http://localhost:4200",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  app.use((0, cors_1.default)(corsOptions));
}
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.all("*", setupAls_middleware_1.setupAsyncLocalStorage);
app.use("/api/story", story_routes_1.storyRoutes);
app.use("/api/auth", auth_routes_1.authRoutes);
app.use("/api/user", user_routes_1.userRoutes);
const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port: " + port);
});
//# sourceMappingURL=server.js.map
