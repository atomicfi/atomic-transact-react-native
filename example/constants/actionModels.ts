// Models + helpers for the Actions screen, mirroring the iOS demo's
// PayLinkActions.swift (PayLinkAction / PayLinkAccountGroup / PayLinkBillGroup,
// makeGroups, decodeGroups, and the pay-link/accounts fetch).

export interface PayLinkAction {
  type: string;
  actionId: string;
}

export interface BillGroup {
  title: string;
  actions: PayLinkAction[];
}

export interface AccountGroup {
  title: string;
  actions: PayLinkAction[];
  bills: BillGroup[];
}

// Shape of the GET /pay-link/accounts response we care about.
interface ApiAction {
  type?: string;
  actionId?: string;
}
interface ApiBill {
  name?: string;
  actions?: ApiAction[];
}
interface ApiAccount {
  company?: { name?: string };
  actions?: ApiAction[];
  bills?: ApiBill[];
}
interface ApiResponse {
  accounts?: ApiAccount[];
}

function normalizeActions(list?: ApiAction[]): PayLinkAction[] {
  const actions: PayLinkAction[] = [];
  for (const a of list ?? []) {
    if (a && typeof a.actionId === 'string' && a.actionId.length > 0) {
      actions.push({ type: a.type ?? 'Action', actionId: a.actionId });
    }
  }
  return actions;
}

// One group per account (account-level actions) plus a group per bill that has
// actions. Accounts with no actionable content are dropped.
export function makeGroups(accounts: ApiAccount[]): AccountGroup[] {
  const groups: AccountGroup[] = [];
  for (const account of accounts ?? []) {
    const bills = (account.bills ?? [])
      .map((b) => ({
        title: b.name ?? 'Bill',
        actions: normalizeActions(b.actions),
      }))
      .filter((b) => b.actions.length > 0);
    const actions = normalizeActions(account.actions);
    if (actions.length === 0 && bills.length === 0) continue;
    groups.push({ title: account.company?.name ?? 'Account', actions, bills });
  }
  return groups;
}

function isAccountGroup(x: unknown): x is AccountGroup {
  return (
    !!x &&
    typeof x === 'object' &&
    typeof (x as AccountGroup).title === 'string' &&
    Array.isArray((x as AccountGroup).actions)
  );
}

function isPayLinkAction(x: unknown): x is PayLinkAction {
  return (
    !!x &&
    typeof x === 'object' &&
    typeof (x as PayLinkAction).actionId === 'string'
  );
}

// Accepts the three JSON shapes the "Change Actions" editor supports:
//   1. The full pay-link/accounts response ({ "accounts": [...] })
//   2. The already-grouped format we persist ([{ title, actions, bills }])
//   3. A flat array of actions ([{ type, actionId }]), wrapped into one group
// Returns null when the text can't be interpreted as any of them.
export function decodeGroups(text: string): AccountGroup[] | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }

  if (
    parsed &&
    typeof parsed === 'object' &&
    !Array.isArray(parsed) &&
    Array.isArray((parsed as ApiResponse).accounts)
  ) {
    return makeGroups((parsed as ApiResponse).accounts as ApiAccount[]);
  }

  if (Array.isArray(parsed)) {
    if (parsed.every(isAccountGroup)) {
      return parsed as AccountGroup[];
    }
    if (parsed.every(isPayLinkAction)) {
      return [
        { title: 'Account', actions: parsed as PayLinkAction[], bills: [] },
      ];
    }
  }

  return null;
}

export function groupsToJson(groups: AccountGroup[]): string {
  return JSON.stringify(groups, null, 2);
}

export async function fetchActionGroups(
  apiBase: string,
  publicToken: string
): Promise<AccountGroup[]> {
  const res = await fetch(`${apiBase}/pay-link/accounts`, {
    headers: {
      'x-public-token': publicToken,
      'x-api-version': 'v2',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const body = (await res.json()) as ApiResponse;
  return makeGroups(body.accounts ?? []);
}
