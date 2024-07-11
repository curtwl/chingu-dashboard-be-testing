import { Subjects } from "@casl/prisma";

import {
    Form,
    ProjectIdea,
    User,
    Voyage,
    VoyageTeam,
    TeamTechStackItem,
} from "@prisma/client";

export type PrismaSubjects = Subjects<{
    Voyage: Voyage;
    User: User;
    Form: Form;
    VoyageTeam: VoyageTeam;
    Ideation: ProjectIdea;
    TeamTechStackItem: TeamTechStackItem;
}>;
