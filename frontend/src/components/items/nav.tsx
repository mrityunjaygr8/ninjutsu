export default function Nav() {
  return (
    <div class="daisy-navbar bg-base-100 p-3">
      <div class="flex-1">
        <a href="/">Ninja Stuff</a>
      </div>
      <nav class="flex-none">
        <ul class="daisy-menu daisy-menu-horizontal">
          <li>
            <a href="/villages">Villages</a>
          </li>
          <li>
            <a href="/ninjas">Ninjas</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
