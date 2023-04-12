function Changelog() {
  return (
    <div className="changelog--main">
      <div className="changelog">Changelog</div>
      <div className="version">v1.0.3</div>
      <ul className="changelog--list">
        <li>Allies added</li>
        <li>The navigation bar is now sticky on larger screens</li>
        <li>You can now search elves, elders and orcs by their IDs</li>
      </ul>
      <div className="version">v1.0.2</div>
      <ul className="changelog--list">
        <li>Orcs page is now fixed</li>
        <li>Allies won't show up in the Look-up page</li>
        <li>
          New button added to Analythics page. You can now check the prices in
          USD
        </li>
      </ul>
      <div className="version">v1.0.1</div>
      <ul className="changelog--list">
        <li>Changelog page added</li>
        <li>
          Total number of Sentinels/Elders/Orcs is now shown under the
          tokens/resources text
        </li>
        <li>ENS can now be used in the LookUp page</li>
      </ul>
    </div>
  );
}

export default Changelog;
