# Prints one line per high/critical advisory in an `npm audit --json` report
# that is not covered by an unexpired entry in audit-accepted-advisories.json.
# npm reports one "vulnerability" per affected package up the dependency chain,
# so the gate counts root advisories instead — one unfixable advisory in a
# transitive dep otherwise shows up as many.
($accepted[0] | map(select(.expires >= (now | strftime("%Y-%m-%d"))) | .id)) as $ok
| [.vulnerabilities[].via[] | objects]
| unique_by(.source)[]
| select(.severity == "high" or .severity == "critical")
| (.url | split("/") | last) as $id
| select(any($ok[]; . == $id) | not)
| "\(.severity)\t\(.name)\t\(.url)"
