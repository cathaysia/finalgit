import type { BranchInfo } from "@/bindings";
import { commands } from "@/bindings";
import { useErrorState } from "@/lib/error";
import { useBranchState } from "@/lib/state";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { match } from "ts-pattern";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export interface BranchProps {
    branch: BranchInfo;
}

export default function EditBranch({ branch }: BranchProps) {
    const { t } = useTranslation();
    const [newName, setNewName] = useState<string>(branch.name);
    const setBranches = useBranchState((s) => s.setBranches);
    const { setError } = useErrorState();

    const [reqBranchRefresh, setReqBanchRe] = useState<boolean>(false);

    useEffect(() => {
        commands.getBranchInfo().then((value) => {
            match(value)
                .with({ status: "ok" }, (v) => {
                    setBranches(v.data);
                })
                .with({ status: "error" }, (err) => {
                    setError(err.error);
                });
        });
    }, [reqBranchRefresh]);

    return (
        <SheetContent title={t("branch.edit_branch")}>
            <SheetHeader>
                <SheetTitle>
                    {`${t("branch.edit_branch")} ${branch.name} `}
                    <Badge>{t(branch.kind || "Local")}</Badge>
                </SheetTitle>
            </SheetHeader>
            <SheetDescription>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>{t("branch.branch_name")}</TableCell>
                            <TableCell>{branch.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t("Commit")}</TableCell>
                            <TableCell>{branch.commit}</TableCell>
                        </TableRow>
                        {branch.upstream && (
                            <TableRow>
                                <TableCell>{t("Upstream")}</TableCell>
                                <TableCell>{branch.upstream}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </SheetDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    type="text"
                    value={newName}
                    placeholder={t("branch.new_branch_name")}
                    onChange={(e) => {
                        setNewName(e.target.value);
                        setReqBanchRe(!reqBranchRefresh);
                    }}
                />
                <Button
                    onClick={() => {
                        if (newName && newName !== branch.name) {
                            commands
                                .createBranch(newName, branch.commit)
                                .then((value) => {
                                    match(value)
                                        .with({ status: "ok" }, () => {
                                            setReqBanchRe(!reqBranchRefresh);
                                        })
                                        .with({ status: "error" }, (err) => {
                                            setError(err.error);
                                        });
                                });
                        }
                    }}
                >
                    {t("Create")}
                </Button>
                <Button
                    onClick={() => {
                        if (newName && newName !== branch.name) {
                            commands
                                .renameBranch(branch, newName)
                                .then((value) => {
                                    match(value)
                                        .with({ status: "ok" }, () => {
                                            setReqBanchRe(!reqBranchRefresh);
                                        })
                                        .with({ status: "error" }, (err) => {
                                            setError(err.error);
                                        });
                                });
                        }
                    }}
                >
                    {t("Rename")}
                </Button>
            </div>
            <div className="flex justify-between">
                {branch.remote == null ? (
                    <>
                        <Button>{t("Push")}</Button>
                        <Button>{t("Pull")}</Button>
                    </>
                ) : (
                    <></>
                )}
                <Button
                    onClick={() => {
                        commands.removeBranch(branch).then((value) => {
                            match(value)
                                .with({ status: "ok" }, () => {
                                    setReqBanchRe(!reqBranchRefresh);
                                })
                                .with({ status: "error" }, (err) => {
                                    setError(err.error);
                                });
                        });
                    }}
                    disabled={branch.is_head}
                >
                    {t("Delete")}
                </Button>
                {branch.kind === "Local" && (
                    <Button
                        onClick={() => {
                            commands
                                .checkoutBranch(branch.name)
                                .then((value) => {
                                    match(value)
                                        .with({ status: "ok" }, () => {
                                            setReqBanchRe(!reqBranchRefresh);
                                        })
                                        .with({ status: "error" }, (err) => {
                                            setError(err.error);
                                        });
                                });
                        }}
                        disabled={branch.is_head}
                    >
                        {t("Checkout")}
                    </Button>
                )}
                <Button>
                    <Link
                        to="/commit"
                        search={{
                            branch: branch.name,
                            kind: branch.kind,
                        }}
                    >
                        {t("commit")}
                    </Link>
                </Button>
            </div>
        </SheetContent>
    );
}
