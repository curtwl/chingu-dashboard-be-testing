import { Injectable } from "@nestjs/common";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { PrismaSubjects } from "../prisma-generated-types";
import { createPrismaAbility, PrismaQuery } from "@casl/prisma";
import { CustomRequest } from "../../global/types/CustomRequest";

export enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete",
    Submit = "submit",
}

type ExtendedSubjects = "all";
export type AppSubjects = PrismaSubjects | ExtendedSubjects;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

@Injectable()
export class AbilityFactory {
    defineAbility({ user }: CustomRequest) {
        const { can, build } = new AbilityBuilder<AppAbility>(
            createPrismaAbility,
        );

        if (user.roles.includes("admin")) {
            can(Action.Manage, "all");
        } else if (user.roles.includes("voyager")) {
            can([Action.Submit], "Voyage");
            can([Action.Read], "Form");
        }
        return build();
    }
}
