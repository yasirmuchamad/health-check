import { createAuditLog } from "../services/audit.service.js";

export const auditMiddleware = (action)  => {
    return (req, res, next) => {
        res.on("finish", async () => {
            try {
                if (res.statusCode < 400) {
                    
                    await createAuditLog({
                        userId:req.user?.id || null,
                        action: action || `${req.method} ${req.originalUrl}`,
                        method: req.method,
                        endpoint:req.originalUrl
                        });
                    }
                
            } catch (err) {
                    console.error("Audit error:", err.message);
            }
        });
        next();
    };
}