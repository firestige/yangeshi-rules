"""Read-only public corpus checks. No deployment credentials are used."""
import hashlib, json
from pathlib import Path
import jsonschema
ROOT=Path(__file__).resolve().parents[1]
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((ROOT/'manifest.json').read_text());records=manifest['files']
assert hashlib.sha256(json.dumps(records,sort_keys=True,separators=(',',':')).encode()).hexdigest()==manifest['tree_sha256']
for name,record in records.items():
    p=ROOT/name
    assert p.resolve().is_relative_to(ROOT) and not p.is_symlink(),name
    assert p.stat().st_size==record['bytes'] and digest(p)==record['sha256'],name
assert (ROOT/'LICENSE').is_file() and (ROOT/'NOTICE.md').is_file()
releases=list((ROOT/'schools').rglob('release.json'));assert releases
for file in releases:
    folder=file.parent;release=json.loads(file.read_text());pack=json.loads((folder/'rules.json').read_text());mapping=json.loads((folder/'source-map.json').read_text())
    schema=json.loads((folder/'rules.schema.json').read_text());jsonschema.Draft202012Validator.check_schema(schema);jsonschema.validate(pack,schema)
    assert digest(folder/'rules.json')==release['ruleset']['rules_sha256']==release['standard']['profile_sha256']
    assert digest(folder/'source-map.json')==release['ruleset']['source_map_sha256']
    rule_document=next(d for d in release['standard']['documents'] if d['id']=='rules')
    assert rule_document['sha256']==digest(folder/'rules.json') and rule_document['bytes']==(folder/'rules.json').stat().st_size and rule_document['version']==release['ruleset']['version']
    assert pack['pack_id']==release['ruleset']['id']
    assert pack['contract_digest']==release['ruleset']['engine_contract_sha256']
    assert pack['runtime_digest']==release['ruleset']['runtime_digest']
    by_id={rule['id']:rule for rule in pack['rules']}
    assert len(by_id)==len(pack['rules'])==len(mapping)
    assert len({row['rule_id'] for row in mapping})==len(mapping)
    for row in mapping:
        assert row['rule_id'] in by_id
        assert row['interpretation']=={key:by_id[row['rule_id']][key] for key in row['interpretation']}
        assert by_id[row['rule_id']]['sources']==[s['source_id'] for s in row['sources']]
        for source in row['sources']:
            assert hashlib.sha256(source['text'].encode()).hexdigest()==source['text_sha256']
    # Schema must reject malformed rule transports, rather than silently accepting them.
    malformed=dict(pack,schema_version='unsupported')
    assert list(jsonschema.Draft202012Validator(schema).iter_errors(malformed))
    print(file.relative_to(ROOT),len(by_id),'rules: schema, sources, integrity, contract passed')
print('All published rule packs passed. Interpretation and unsupported cases remain subject to human review.')
