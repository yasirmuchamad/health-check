import { createAuditLog } from "../service/audit.service.js";

export const auditMiddleware = (action) => {
    return async (req, res, next) => {
        try {
            res.on("finish", async () => {
                if (res.statusCode < 400) {
                    await createAuditLog({
                        userId:req.user?.id || null,
                        action,
                        method: req.method,
                        endpoint:req.originalUrl
                    });
                }
            });
            next();
        } catch (err) {
            console.error("Audit error:", err);
            next();
        }
    };
};