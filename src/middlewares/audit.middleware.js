import { createAuditLog } from "../services/audit.service.js";

export const auditMiddleware = (action)  => {
    return (req, res, next) => {
        res.on("finish", async () => {
            try {
                if (res.statusCode < 400 && req.user?.id) {
                    
                    await createAuditLog({
                        action: action || `${req.method} ${req.originalUrl}`,
                        method: req.method,
                        endpoint: req.originalUrl,
                        ipAddress: req.ip,
                        actorId: req.user.id,
                        targetId: req.params?.id
                            ? Number(req.params.id)
                            : req.user.id
                        });
                    }
                
            } catch (err) {
                    console.error("Audit error:", err.message);
            }
        });
        next();
    };
};