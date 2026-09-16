/**
 * Publisher lookup helpers for the static storefront.
 *
 * These queries power the game catalog and detail pages by exposing the
 * lightweight publisher metadata needed to render page content during build.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Returns every publisher ordered alphabetically by name.
 *
 * @param db - Database client used to query the publisher table.
 * @returns A list of publishers containing each publisher's id and name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
