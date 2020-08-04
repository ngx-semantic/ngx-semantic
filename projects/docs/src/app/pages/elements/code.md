<div class="ui existing segment"><pre><code class="code xml"><span class="tag">&lt;<span class="title">i</span> <span class="attribute">class</span>=<span class="value">"ae flag"</span>&gt;</span><span class="tag">&lt;/<span class="title">i</span>&gt;</span>
<span class="tag">&lt;<span class="title">i</span> <span class="attribute">class</span>=<span class="value">"france flag"</span>&gt;</span><span class="tag">&lt;/<span class="title">i</span>&gt;</span>
<span class="tag">&lt;<span class="title">i</span> <span class="attribute">class</span>=<span class="value">"myanmar flag"</span>&gt;</span><span class="tag">&lt;/<span class="title">i</span>&gt;</span></code></pre></div>



<div *ngIf="toggleStateMap['']" class="ui label" style="width: 80%;"> Example 
  <hr>
  <hr>
  <pre>
    <code>
      {{}}
    </code>
  </pre>
</div>

show = false;
toggleStateMap: any = {};
toggleLabel(key: string) {
  this.toggleStateMap[key] = !this.toggleStateMap[key];
}

(click)="toggleLabel('horizontalDivider')"
