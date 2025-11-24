/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User management and authorization
 *
 * /users/{uid}:
 *   get:
 *     summary: Get user details by UID
 *     description: 
 *       Accessible to **admin**, **manager**, or the same user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID whose details you want to fetch
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   example: "abc123"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 role:
 *                   type: string
 *                   example: "user"
 *       401:
 *         description: Unauthorized — Missing or invalid token
 *       403:
 *         description: Forbidden — Insufficient permissions
 *       404:
 *         description: User not found
 *
 * /users/admin/set-role/{uid}:
 *   post:
 *     summary: Set a user's role (Admin-only action)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: UID of the user whose role is being updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, manager, user]
 *                 example: manager
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role input
 *       401:
 *         description: Unauthorized — Missing or invalid token
 *       403:
 *         description: Forbidden — Only admin can update roles
 *       404:
 *         description: User not found
 */

import express from "express";
import { getUserDetails, setUserRole } from "../controllers/userController";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

// User route
router.get("/:uid", isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }), getUserDetails);

// Admin route to set role
router.post("/admin/set-role/:uid",isAuthorized( {hasRole: ["admin"]}),setUserRole);

export default router;
