import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '../../users/enums/users.enums';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers['token'];
        if (!token) {
            return false;
        }

        try {
            // let validateUser = async (token: any) => {
            const decoded = await this.jwtService.verify(token, {
                secret:
                    process.env.JWT_SECRET,
            });
            // if(decoded.role == )
            const userRoles = decoded.role;
            const hasRequiredRole = requiredRoles.some((role) =>
                userRoles?.includes(role),
            );
            if (hasRequiredRole) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
}
